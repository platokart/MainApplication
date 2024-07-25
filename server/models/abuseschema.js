const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        unique:true
    },
    issue: {
        type: String,
        required: true
    }
});

const ReportAbuse = mongoose.model("ReportAbuse", reportSchema);

module.exports=ReportAbuse;