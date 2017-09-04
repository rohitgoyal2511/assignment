var statusENUMS = {
    Active : "Active",
    Complete : "Complete",
    Deleted : "Deleted"
}

var todos = {
    1: {title: "learn JS", status: statusENUMS.Active},
    2: {title: "GIT tutorial", status: statusENUMS.Active},
    3: {title: "Interactive Git", status: statusENUMS.Active}
}

var next_todo_id = 4;

module.exports = {
    statusENUMS : statusENUMS,
    todos : todos,
    next_todo_id : next_todo_id
}