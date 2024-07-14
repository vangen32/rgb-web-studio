export default {
    GetDate(dateStr) {
      try {
        let date = dateStr;
        if (typeof dateStr !== typeof new Date()) {
          date = new Date(dateStr);
        }
        return date;
      } catch {
        return null;
      }
    },
    // return DD.MM.YYYY
    GetDateString(dateStr) {
      try {
        let date = this.GetDate(dateStr);
        if (!date) throw new Error("Date formatter error. Method: GetDate");
        let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
        let month =
          date.getMonth() + 1 > 9
            ? date.getMonth() + 1
            : `0${date.getMonth() + 1}`;

        return `${day}.${month}.${date.getFullYear()}`;
      } catch (err) {
        console.error("Date formatter error. Method: GetDate");
        throw err;
      }
    },
    // return hh:mm DD.MM.YYYY
    GetDateTime(dateStr) {
      try {
        let date = this.GetDate(dateStr);
        if (!date) return undefined;

        let hours =
          date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
        let minutes =
          date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
        let day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
        let month =
          date.getMonth() + 1 > 9
            ? date.getMonth() + 1
            : `0${date.getMonth() + 1}`;

        return `${hours}:${minutes} ${day}.${month}.${date.getFullYear()}`;
      } catch (err) {
        console.error("Date formatter error. Method: GetDateTime");
        throw err;
      }
    },
    // HH : mm
    GetTime(dateStr) {
      try {
        let date = this.GetDate(dateStr);
        if (!date) return undefined;

        let hours =
          date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
        let minutes =
          date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
        return `${hours}:${minutes}`;
      } catch (err) {
        console.error("Date formatter error. Method: GetDateTime");
        throw err;
      }
    },
    // return MM dd, HH:mm
    GetDateTimeShort(dateStr) {
      try {
        let date = this.GetDate(dateStr);
        if (!date) throw new Error("Date formatter error. Method: GetDateTime");

        let hours =
          date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
        let minutes =
          date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;

        return `${months[date.getMonth()].substring(
          0,
          3,
        )} ${date.getDate()}, ${hours}:${minutes}`;
      } catch (err) {
        console.error("Date formatter error. Method: GetDateTimeShort");
        throw err;
      }
    },
    // num = [0...11]
    isToday(someDate) {
      let date = this.GetDate(someDate);
      if (!date) return undefined;
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    },
    isYesterday(date) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() - 1);
      if (tomorrow.toDateString() === date.toDateString()) return true;
      return false;
    },
    isSameDay(date1Any, date2Any) {
      try {
        let date1 = this.GetDate(date1Any);
        let date2 = this.GetDate(date2Any);
        return (
          date1.getDate() === date2.getDate() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getFullYear() === date2.getFullYear()
        );
      } catch (err) {
        console.error("isSameDay func error");
        throw err;
        return false;
      }
    },
    timestampToTimer(int) {
      let data = Math.abs(Number(int));
      if (data && typeof data === "number") {
        let hours = Math.floor(data / 3600);
        let min = Math.floor((data - 3600 * hours) / 60);
        let seconds = Math.floor(data % 60);
        hours = `${hours > 0 ? (hours < 10 ? `0${hours}:` : `${hours}:`) : ``}`;
        min = `${min < 10 ? `0${min}:` : `${min}:`}`;
        seconds = `${seconds < 10 ? `0${seconds}` : seconds}`;
        return `${hours}${min}${seconds}`;
      } else {
        return undefined;
      }
    },
    // num 0-11
    getMonthName(num) {
      try {
        return months[num];
      } catch {
        return "Некоректний аргумент";
      }
    },
    hoursAgo(requestedDate, startingDate = new Date()) {
      let date = this.GetDate(requestedDate);
      let rDate = this.GetDate(startingDate);
      if (!date || !rDate) return undefined;
      let timeStamp = rDate - date;
      return Math.round(timeStamp / 3600000);
    },
    getTimeDifference(startDate1, endDate1 = new Date()) {
      let startDate = this.GetDate(startDate1);
      let endDate = this.GetDate(endDate1);

      let timeDiff = Math.abs(endDate.getTime() - startDate.getTime());

      const diffYears = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
      timeDiff -= diffYears * (1000 * 60 * 60 * 24 * 365);

      const diffMonths = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
      timeDiff -= diffMonths * (1000 * 60 * 60 * 24 * 30);

      const diffDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      timeDiff -= diffDays * (1000 * 60 * 60 * 24);

      const diffHours = Math.floor(timeDiff / (1000 * 60 * 60));
      timeDiff -= diffHours * (1000 * 60 * 60);

      const diffMinutes = Math.floor(timeDiff / (1000 * 60));
      timeDiff -= diffMinutes * (1000 * 60);

      const diffSeconds = Math.floor(timeDiff / 1000);

      return {
        Y: diffYears,
        M: diffMonths,
        d: diffDays,
        h: diffHours,
        m: diffMinutes,
        s: diffSeconds,
      };
    },
};
