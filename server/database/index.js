const { default: mongoose } = require("mongoose");

const connectDb = async () => {
    await mongoose.connect(`${process.env.DATABASE}`).then(() => console.log("db connected ")).catch(err => console.log(err))
}

module.exports = connectDb