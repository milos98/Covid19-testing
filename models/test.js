const mongoose = require('mongoose');

// Test Schema
const TestSchema = mongoose.Schema({
  testingDateTime: {
    type: Date,
    required: true,
  },
  testType: {
    type: String,
    required: true,
  },
  selfTest: {
    answers: [
        {
            type: String
        }
    ],
    numOfPositiveAns: Number,
  },
  PCR: {
    duration: Date,
    status: String,
  },
  userId: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'users',
    },
  ],
  result: {
    type: String
  },
});

const Test = (module.exports = mongoose.model('Test', TestSchema));

module.exports.getAllTestByUserId = function(id, callback) {
    const query = { userId: id };
    Test.find(query).sort('-testingDateTime').exec(callback);
}

module.exports.getAllTestByUserIdOnExactDate = function(id, date, callback) {
    const startOfTheDay = new Date(date).setHours(0,0,0,0);
    const endOfTheDay = new Date(date).setHours(23,59,59,999);
    const query = { 
        userId: id,
        testingDateTime: {
            $gte: startOfTheDay,
            $lte: endOfTheDay
        }
    };
    Test.find(query).sort('-testingDateTime').exec(callback);
}

module.exports.addNewTest = function(testData, callback) {
    testData.save(callback);
}

module.exports.updateTestResults = function(userId, callback) {
    const tests = Test.getAllTestByUserId(userId, (error, tests) => {
        if(error) throw error;

        if(!tests) return;
        
        const timeDate = new Date();
        const toComplete = tests.filter(test => test.testType == 'PCR' &&  test.PCR.duration < timeDate);
        console.log(toComplete)
        
        toComplete.forEach(test => {
            const result = (Math.random() > 0.5) ? 'Positive' : 'Negative';
            Test.updateOne(
                { _id: test._id }, 
                { $set: { result: result, 'PCR.status': 'Completed' } },
                (error, isUpdated) => {
                    if(error) throw error;
        
                    if(!isUpdated)
                    res.json({
                        success: false,
                        message: `Test with id ${test._id} cant be updated!`,
                    });
                });
        });

    });
    callback;
}

module.exports.numByTypeOnExactDate = function(type, userId, date) {
    Test.getAllTestByUserIdOnExactDate(userId, date, (error, tests) => {
        if(error) throw error;
        
        console.log(tests.length);
        const reducer = (acc, test) => (test.testType === type) ? acc + test : acc;

        if(tests.length) {
            return tests.reduce(reducer);
        } else {
            return 0;
        }
    })
}