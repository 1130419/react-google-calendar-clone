import moment from "moment";

/**
 * Generate all days in a week
 * @param {moment} currentDate - Any date in the week
 * @returns {array} days - All days in the week with date, dateStamp and weekDayName
 */
export const getAllDaysInTheWeek = (currentDate = moment()) => {
  const weekStart = currentDate.clone().startOf("week");
  weekStart.set("hours", 0).set("minutes", 0);

  return [
    {
      date: weekStart.date(),
      dateStamp: +weekStart,
      weekDayName: weekStart.format("ddd")
    }
  ];
};

export const getNextDayInTheWeek = (currentDate = moment()) => {
  const nextDay = currentDate.clone();
  nextDay.set("hours", 0).set("minutes", 0);

  return [
    {
      date: nextDay.date(),
      dateStamp: +nextDay,
      weekDayName: nextDay.format("ddd")
    }
  ];
};

// All the hours in the day
export const times = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

/**
 * Generated coordinated for the highlight
 * @param {Object} event - Event object
 * {
 *  start: Time stamp for the start of the event :timeStamp,
 *  title: Title fo the new event :String,
 *  end: Time stamp for the end of the event :timeStamp,
 * }
 * @param {timeStamp} startDate - Timestamp of any date in the current week
 * @returns {Object} coordinates - Coordinates object with
 * {
 *  top - CSS top of the element,
 *  left - CSS left of the element,
 *  width - CSS width of the element,
 *  height - CSS height of the element
 * }
 */
export const generateWeekViewCoordinates = (event, startDate) => {
  const start = moment(event.start);
  const end = moment(event.end);
  const duration = moment.duration(end.diff(start));
  const weekStart = moment(startDate);

  // Calculating Top
  const top = start.minutes() === 30 ? "50%" : "0%";

  // Calculating height
  const timeFactor = duration.hours() + duration.minutes() / 60;
  const height = timeFactor * 100;

  let left, width;
  if (weekStart.week() === start.week()) {
    const weekDay = start.weekday();
    left = (weekDay + 1) * 12.5;
  }

  if (weekStart.week() === start.week() && weekStart.week() === end.week()) {
    const daysDiff = duration.days();
    width = (daysDiff + 1) * 12.5 - 2;
  }

  if (weekStart.week() > start.week() && weekStart.week() === end.week()) {
    const daysDiff = moment
      .duration(
        end.diff(
          weekStart
            .startOf("week")
            .set("hours", start.hours())
            .set("minutes", start.minutes())
        )
      )
      .days();
    width = (daysDiff + 1) * 12.5 - 2;
  }

  if (weekStart.week() > start.week()) {
    left = 12.5;
  }

  if (weekStart.week() < end.week()) {
    width = 100 - left;
  }

  return {
    top: top + "%",
    height: height + "%",
    left: "12.5%",
    width: "75%"
  };
};

/**
 * Checks if the dateStamp represents todays date
 * @param {dateStamp} dateStamp - Date Stamp to check
 * @return {boolean}
 */
export const isTodaysDate = (dateStamp) => {
  const today = moment();
  dateStamp = moment(dateStamp);
  return (
    moment.duration(dateStamp.diff(today)).days() === 0 &&
    today.day() === dateStamp.day()
  );
};
