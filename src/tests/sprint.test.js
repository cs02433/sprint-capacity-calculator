import spintdata from "../datamodel/sprint"

test("test number of available days when total number of days is multiple of 7", () => {
    const sprint = spintdata(new Date('03/07/2020'), new Date('03/14/2020'));
    expect(sprint.getWorkingDays()).toEqual(5);
});

test("test number of available days when total number of days is not multiple of 7 and start day is sat", () => {
    const sprint = spintdata(new Date('03/07/2020'), new Date('03/15/2020'));
    expect(sprint.getWorkingDays()).toEqual(5);
});

test("test number of available days when total number of days is not multiple of 7 when start day is sun", () => {
    const sprint = spintdata(new Date('03/08/2020'), new Date('03/16/2020'));
    expect(sprint.getWorkingDays()).toEqual(6);
});

test("test - 1n", () => {
    const sprint = spintdata(new Date('03/09/2020'), new Date('03/13/2020'));
    expect(sprint.getWorkingDays()).toEqual(5);
});

test("test - 2n", () => {
    const sprint = spintdata(new Date('03/04/2020'), new Date('03/13/2020'));
    expect(sprint.getWorkingDays()).toEqual(8);
});


test("test - 3n", () => {
    const sprint = spintdata(new Date('03/14/2020'), new Date('03/15/2020'));
    expect(sprint.getWorkingDays()).toEqual(0);
});


test("test - 4n", () => {
    const sprint = spintdata(new Date('03/14/2020'), new Date('03/14/2020'));
    expect(sprint.getWorkingDays()).toEqual(0);
});


test("test - 5n", () => {
    const sprint = spintdata(new Date('03/10/2020'), new Date('03/16/2020'));
    expect(sprint.getWorkingDays()).toEqual(5);
});


test("capacity 1", () => {
    let teamData1 = {
        publicHolidays: 0,
        members: [{
            productivity: 100,
            leaves: 0
        }],
        fixedTasks: 24 * 60
    };
    const sprint = spintdata(new Date('03/10/2020'), new Date('03/16/2020'), teamData1);
    expect(sprint.getCapacity()).toEqual("4 days, 0 hours and 0 minutes");
});


test("capacity 2", () => {
    let teamData1 = {
        publicHolidays: 0,
        members: [{
            productivity: 50,
            leaves: 1
        }],
        fixedTasks: 24 * 60
    };

    const sprint = spintdata(new Date('03/10/2020'), new Date('03/16/2020'), teamData1);
    expect(sprint.getCapacity()).toEqual("1 days, 0 hours and 0 minutes");
});

test("capacity 3", () => {
    let teamData1 = {
        publicHolidays: 0,
        members: [{
            productivity: 50,
            leaves: 0
        }],
        fixedTasks: 24 * 60
    };

    const sprint = spintdata(new Date('03/10/2020'), new Date('03/16/2020'), teamData1);
    expect(sprint.getCapacity()).toEqual("1 days, 12 hours and 0 minutes");
});


test("capacity 4", () => {
    let teamData1 = {
        publicHolidays: 1,
        members: [{
            productivity: 50,
            leaves: 0
        },
            {
                productivity: 50,
                leaves: 1
            },
            {
                productivity: 100,
                leaves: 0
            }
        ],
        fixedTasks: 24 * 60
    };
    const sprint = spintdata(new Date('03/10/2020'), new Date('03/16/2020'), teamData1);
    expect(sprint.getCapacity()).toEqual("6 days, 12 hours and 0 minutes");
});