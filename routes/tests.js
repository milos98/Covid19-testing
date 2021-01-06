const express = require('express');
const testRouter = express.Router();
const passport = require('passport');
const Test = require('../models/test');
const User = require('../models/user');

// New test
testRouter.post('/save/:type', passport.authenticate('jwt', { session: false }), (req, res) => {
    const type = req.params.type;
    let newTest = new Test({
      testingDateTime: new Date(),
      userId: req.body.userId
    });

    switch(type) {
        case 'pcr': newTest.testType = 'PCR';
                    newTest.PCR = {
                        duration: new Date(newTest.testingDateTime.getTime() + 10000),
                        status: 'In progress'
                    };
                    break;
        case 'self':newTest.testType = 'Self test';
                    newTest.selfTest = {
                        answers: req.body.selfTest.answers,
                        numOfPositiveAns: req.body.selfTest.answers.length
                    };
                    newTest.result = (newTest.selfTest.numOfPositiveAnswers > 1) ? 'Maybe' : 'Negative';
                    break;
        case 'fast':newTest.testType = 'Fast test';
                    newTest.result = (Math.random() > 0.5) ? 'Positive' : 'Negative';
                    break;
        default :   return res.json({ success: false, message: 'Bad type!' });
    }

    Test.addNewTest(newTest, (error, isSaved) => {
        if(error) throw error;

        if(isSaved) {
            Test.getAllTestByUserId(newTest.userId, (error, tests) => {
                User.addNewTest(newTest.userId, tests[0]._id, (error, isSaved) => {
                    if(error) throw error;

                    if(isSaved) {
                        res.json({ success: true, message: 'Test saved!' });
                    } else {
                        res.json({ success: false, message: 'Test is not saved!' });
                    }
                });
            });
        } else {
            res.json({ success: false, message: 'Test is not saved!' });
        }
    });
  });

  module.exports = testRouter;