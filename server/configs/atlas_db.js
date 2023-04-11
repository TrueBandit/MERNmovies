const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDB = () => {
	mongoose
        .connect(
            "mongodb://mern-user:mern-pass@ac-5odiu9n-shard-00-00.3q95cwr.mongodb.net:27017,ac-5odiu9n-shard-00-01.3q95cwr.mongodb.net:27017,ac-5odiu9n-shard-00-02.3q95cwr.mongodb.net:27017/mern_finalex_db?ssl=true&replicaSet=atlas-8uull9-shard-0&authSource=admin&retryWrites=true&w=majority"
        )
		.then(() => console.log("Connected to Atlas DB!"))
		.catch((error) => console.log(error));
};

module.exports = connectDB;


            
