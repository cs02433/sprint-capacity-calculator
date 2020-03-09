export default (startDate, endDate, teamData) => {
    const ms_per_day = 24 * 60 * 60 * 1000;
    return {
        getTotalDays: function () {
            const diffms = endDate - startDate;
            return diffms / ms_per_day + 1;
        },
        getNumberOfWeekEnds: function () {
            const totalDays = this.getTotalDays();
            return parseInt((totalDays / 7)) * 2;
        },
        totalDaysInLastWeek: function () {
            const totalDays = this.getTotalDays();
            return totalDays % 7;
        },
        countWorkingDays: function (remainingdays, startDay) {
            let count = 0;
            for (let i = 0; i < remainingdays; i++) {
                let c = (startDay + i) % 7;
                if (c !== 6 && c !== 0) {
                    count++;
                }
            }
            return count;
        },
        getNumberOfWorkingDayInLastWeek: function (daysInLastWeek) {
            const startDay = startDate.getDay();
            return this.countWorkingDays(daysInLastWeek, startDay);

        },
        getWorkingDays: function () {
            const totalDays = this.getTotalDays();
            const weekends = this.getNumberOfWeekEnds();
            const daysInLastWeek = this.totalDaysInLastWeek();
            let workingDaysInLastWk = this.getNumberOfWorkingDayInLastWeek(daysInLastWeek);
            return (totalDays - weekends - daysInLastWeek + workingDaysInLastWk);
        },
        calTotalCapacity: function (totalWorkingDays) {
            let totalCapacity = 0;
            const members = teamData.members;
            for (let i = 0; i < members.length; i++) {
                let member = members[i];
                totalCapacity += (member.productivity / 100) * (totalWorkingDays - member.leaves - teamData.publicHolidays);
            }
            return totalCapacity;
        },
        calculateAvailableCapa: function (totalCapacity) {
            let tc = (totalCapacity * 24 * 60 - teamData.fixedTasks);
            let th = parseInt(tc / 60);
            let tm = parseInt(tc % 60);
            let td = parseInt(th / 24);
            th = parseInt(th % 24);
            return `${td} days, ${th} hours and ${tm} minutes`;
        },
        getCapacity() {
            const totalWorkingDays = this.getWorkingDays();
            let totalCapacity = this.calTotalCapacity(totalWorkingDays);
            return this.calculateAvailableCapa(totalCapacity);
        }
    };
}