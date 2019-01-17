const mongoose = require('mongoose');
const readline = require('readline');


const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var opts = {keepAlive: 1, useNewUrlParser: true};

mongoose.connect(process.env.MONGO_URI, opts);

const Cat = mongoose.model('Cat', { name: String });

rl.question('Enter new cat to add to database: ', (answer) => {
	rl.close();

	const kitty = new Cat({ name: answer});
	kitty.save().then(() => {
		Cat.find({}, function(err, cats) {
			console.log(`Database Now Contains ${cats.length} entries`);
			console.log(cats)

			process.exit(0);
		});
	});
	
  
  });

