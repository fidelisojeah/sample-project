import { getWeek, addDays, setDay, addMonths, formatRelative, setDate, addWeeks,parse } from 'date-fns'

import { Chore, DailySchedule, WeeklySchedule, User, MonthlySchedule, SingleSchedule } from '@models';
import Response from '@helpers/Response';
import { validateSchedule } from '@validations';
import { BaseController } from './index';
import { GenericException } from '@helpers/exceptions';
import { NOT_IMPLEMENTED, BAD_REQUEST } from 'http-status-codes';
import { Op } from 'sequelize';


export default class ScheduleController extends BaseController {
    async createSingleChore(chore, schedule) {
        console.log(schedule, 'Schedule');
        const data = {
            schedule_name: `One-Off ${chore.name}`,
            schedule_date: schedule.schedule_date,
            chore_id: chore.id,
            user_id: schedule.user.id
        };
        await SingleSchedule.create(data);
    }
    async createDailyChores(chore, schedule) {
        const data = [...Array(7).keys()].map((day) => ({
            day_of_week: day,
            schedule_name: `daily ${chore.name}`,
            chore_id: chore.id,
            user_id: schedule.user.id
        }));
        await DailySchedule.bulkCreate(data);
    }

    async createWeeklyChores(chore, schedule) {
        const data = [...Array(52).keys()].map((week) => ({
            week_of_year: week,
            schedule_name: `Weekly ${chore.name}`,
            chore_id: chore.id,
            user_id: schedule.user.id
        }));
        await WeeklySchedule.bulkCreate(data);

    }

    async createMonthlyChores(chore, schedule) {
        const data = [...Array(12).keys()].map((month) => ({
            month_of_year: month,
            schedule_name: `Monthly ${chore.name}`,
            chore_id: chore.id,
            user_id: schedule.user.id
        }));
        return MonthlySchedule.bulkCreate(data);
    }

    async create(schedule, chore, user) {
        switch (schedule.type) {
            case 'one-off':
                return this.createSingleChore(chore, { ...schedule, user });
            case 'daily':
                return this.createDailyChores(chore, { ...schedule, user });
            case 'weekly':
                return this.createWeeklyChores(chore, { ...schedule, user });
            case 'monthly':
                return this.createMonthlyChores(chore, { ...schedule, user });
            default:
                throw new GenericException({
                    messgae: 'MethodNotImplemented',
                    statusCode: NOT_IMPLEMENTED,
                    message: 'Method not yet implemented'
                });
        }
    }

    /**
     * Create a new Schedule (from the chore endpoint)
     * @async
     * @param  {object} request - Request object
     * @param {object} response - Response object
     * @param {object} next The next middleware
    */
    async createFromChore(request, response, next) {
        try {
            const { id } = request.params;
            const chore = await this.findObjector404(Chore, id);
            const scheduleDetails = await validateSchedule(request.body);

            const user = await User.findOne({ where: { id: scheduleDetails.user } })
            if (!user) {
                throw new GenericException({
                    message: 'User Not Found',
                    errors: { user: ['User does not Exist'] }
                });
            }
            await this.create(scheduleDetails, chore, user);

            const allTasks = await this.listUpcomingTasksForUser(user.id);
            Response.success(response, 200, allTasks);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Create a new Schedule (from the schedule endpoint)
     * @async
     * @param  {object} request - Request object
     * @param {object} response - Response object
     * @param {object} next The next middleware
    
    */
    async newSchedule(request, response, next) {
        try {
            const { chore, ...scheduleDetails } = await validateSchedule(request.body, true);

            const choreObject = await Chore.findOne({ where: { id: chore } })
            if (!choreObject) {
                throw new GenericException({
                    statusCode: BAD_REQUEST,
                    message: 'Chore Not Found.',
                    errors: { chore: ['User does not Exist.'] }
                });
            }
            const user = await User.findOne({ where: { id: scheduleDetails.user } })
            if (!user) {
                throw new GenericException({
                    statusCode: BAD_REQUEST,
                    message: 'User Not Found',
                    errors: { user: ['User does not Exist.'] }
                });
            }
            await this.create(scheduleDetails, choreObject, user);

            const allTasks = await this.listUpcomingTasksForUser(user.id);
            Response.success(response, 200, allTasks);
        } catch (error) {
            next(error);
        }
    }

    retrieveDates(dayOfWeek, today) {
        const normalisedDay = (dayOfWeek < today.getDay() ? (dayOfWeek + 7) : dayOfWeek) - today.getDay();

        const actualDate = addDays(today, normalisedDay);

        return { actualDate, formattedDate: formatRelative(actualDate, today) };
    }

    retrieveWeekDates(weekOfYear, today, dayOfWeek) {
        const thisWeek = getWeek(today);

        const normalisedWeek = ((weekOfYear < thisWeek) ? (weekOfYear + 52) : weekOfYear) - thisWeek;

        const refDate = setDay(new Date(), dayOfWeek);
        const actualDate = addWeeks(refDate, normalisedWeek);

        return { actualDate, formattedDate: formatRelative(actualDate, today) };
    }

    retrieveMonthDates(monthOfYear, today, dayOfMonth) {
        const thisMonth = today.getMonth();

        const normalisedMonth = ((monthOfYear < thisMonth) ? (monthOfYear + 12) : monthOfYear) - thisMonth;

        const refDate = setDate(new Date(), dayOfMonth);
        const actualDate = addMonths(refDate, normalisedMonth);

        return { actualDate, formattedDate: formatRelative(actualDate, today) };
    }

    async listUpcomingTasksForUser(userId) {
        const user = await this.findObjector404(User, userId);
        const today = new Date();

        const allUpcomingTasks = await SingleSchedule.findAll({
            where: {
                schedule_date: {
                    [Op.gte]: new Date()
                }
            }, attributes: ['id', 'schedule_date'],
            include: [{
                model: Chore,
                attributes: ['id', 'name', 'description']
            }]
        })
            .map(el => el.get({ plain: true }))
            .map(({ schedule_date, ...details }) => ({
                type: 'One Off',
                ...details,
                actualDate: schedule_date,
                formattedDate: formatRelative(schedule_date, today)
            }));

        const allDailyTasks = await DailySchedule.findAll({
            where: {
                user_id: user.id
            },
            attributes: ['id', 'day_of_week'],
            include: [{
                model: Chore,
                attributes: ['id', 'name', 'description']
            }]
        })
            .map(el => el.get({ plain: true }))
            .map(({ day_of_week, ...dayDetails }) => ({
                type: 'Daily',
                ...dayDetails,
                ...this.retrieveDates(day_of_week, today)
            }));

        const allWeeklyTasks = await WeeklySchedule.findAll({
            where: {
                user_id: user.id
            },
            attributes: ['id', 'week_of_year', 'day_of_week'],
            include: [{
                model: Chore,
                attributes: ['id', 'name', 'description']
            }]
        })
            .map(el => el.get({ plain: true }))
            .map(({ week_of_year, day_of_week, ...weekDetails }) => ({
                type: 'Weekly',
                ...weekDetails,
                ...this.retrieveWeekDates(week_of_year, today, day_of_week)
            }));

        const allMonthlyTasks = await MonthlySchedule.findAll({
            where: {
                user_id: user.id
            },
            attributes: ['id', 'day_of_month', 'month_of_year'],
            include: [{
                model: Chore,
                attributes: ['id', 'name', 'description']
            }]
        })
            .map(el => el.get({ plain: true }))
            .map(({ day_of_month, month_of_year, ...monthDetails }) => ({
                type: 'Monthly',
                ...monthDetails,
                ...this.retrieveMonthDates(month_of_year, today, day_of_month)
            }));

        const allTasks = [].concat(allDailyTasks, allWeeklyTasks, allMonthlyTasks, allUpcomingTasks)
            .sort((a, b) => a.actualDate - b.actualDate)
            // only return the upcoming 10
            .filter((_value, index) => index < 10);
        return allTasks;
    }

    /**
     * Create a new Schedule (from the schedule endpoint)
     * @async
     * @param  {object} request - Request object
     * @param {object} response - Response object
     * @param {object} next The next middleware
    */
    async listUpcoming(request, response, next) {
        // no pagination yet
        try {

            const { userId } = request.params;

            const allTasks = await this.listUpcomingTasksForUser(userId);
            Response.success(response, 200, allTasks);
        } catch (error) {
            next(error);
        }
    }
}