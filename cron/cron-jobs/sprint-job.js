const Sprint = require('../../models/Sprint');

async function newSprint (){
    const oldSprint = await Sprint.findOne({ }).sort({"week" : -1}).populate("items");
    const newSprint = new Sprint({"week": oldSprint.week + 1});
    const completed = oldSprint.items.filter(x => x.status === 'done').length;
    oldSprint.completed = completed;
    oldSprint.failed = oldSprint.items.length - completed;

    await oldSprint.save();
    await newSprint.save();
}

module.exports = { newSprint }