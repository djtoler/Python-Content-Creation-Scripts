const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { arch } = require('os');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

let mainEvent          ;  
let sequenceOfEvents   ;  
let narrativeStyle     ;  
let importantCharacter1;  
let importantCharacter2;  
let importantCharacter3;  
let importantCharacter4;  
let keyRelationships   ;  
let normalDay1         ;  
let normalDay2         ;  
let normalDay3         ;  
let normalDay4         ;  
let incitingEvent      ;  
let challenges         ;  
let escalation         ;  
let choices            ;  
let characterReactions ;  
let turningPoint       ;  
let conflictResolution ;  
let consequences       ;  
let aftermath          ;  
let remainingConflicts ;  
let newChallenges      ;  
let storyEnding        ;  
let newNormal          ;  
let characterChanges   ;  
let lessonsLearned     ;  
let mainTheme          ;  
let arcSupport         ;  
let audienceFeelings   ;  

app.post('/submit-form', (req, res) => {
    console.log('hit post');

    const data                                  = req.body;
    const promptOutput                          = data.storyPurpose
    const storyPurpose                          = `This story will be used as a script for a YouTube video about: ${data.storyPurpose}\n`;
    
    mainEvent                                   = `The main event is: ${data.mainEvent}\n`;
    sequenceOfEvents                            = `The sequence of events are: ${data.sequenceOfEvents}\n`;
    narrativeStyle                              = `The narrative I am aiming for is: ${data.narrativeStyle}\n`;
    importantCharacter1                         = `The important characters to focus on are: ${data.importantCharacter1}\n`;
    importantCharacter2                         = `The important characters to focus on are: ${data.importantCharacter2}\n`;
    importantCharacter3                         = `The important characters to focus on are: ${data.importantCharacter3}\n`;
    importantCharacter4                         = `The important characters to focus on are: ${data.importantCharacter4}\n`;
    keyRelationships                            = `The key relationships between the characters are: ${data.keyRelationships}\n`;
    normalDay1                                  = `A 'normal day in the life' for [main character] looks like: ${data.normalDay1}\n`;
    normalDay2                                  = `A 'normal day in the life' for [main character] looks like: ${data.normalDay2}\n`;
    normalDay3                                  = `A 'normal day in the life' for [main character] looks like: ${data.normalDay3}\n`;  
    normalDay4                                  = `A 'normal day in the life' for [main character] looks like: ${data.normalDay4}\n`;      
    incitingEvent                               = `What event disrupts the 'normal life' of the main character(s) and why is this event significant: ${data.incitingEvent}\n`;
    challenges                                  = `What are the challenges, conflicts, or obstacles that the characters face as a result of the inciting incident: ${data.challenges}\n`;
    escalation                                  = `How do these challenges escalate over time: ${data.escalation}\n`;
    choices                                     = `What choices do the characters make to deal with these challenges: ${data.choices}\n`;
    characterReactions                          = `How do the characters react to this event: ${data.characterReactions}\n`;
    turningPoint                                = `What is the turning point or peak of the story: ${data.turningPoint}\n`;
    conflictResolution                          = `How does this event bring the conflicts and challenges to a head: ${data.conflictResolution}\n`;
    consequences                                = `How do the characters confront this situation, and what are the immediate consequences: ${data.consequences}\n`;
    aftermath                                   = `How do the characters deal with the aftermath of the climax: ${data.aftermath}\n`;
    remainingConflicts                          = `What actions do they take to resolve the remaining conflicts or tie up loose ends: ${data.remainingConflicts}\n`;
    newChallenges                               = `Are there any new challenges or twists that arise: ${data.newChallenges}\n`;
    storyEnding                                 = `How does the story end: ${data.storyEnding}\n`;
    newNormal                                   = `What is the new 'normal life' for the characters after the events of the story: ${data.newNormal}\n`;
    characterChanges                            = `What changes have the characters undergone: ${data.characterChanges}\n`;
    lessonsLearned                              = `Are there any lessons learned or insights gained: ${data.lessonsLearned}\n`;
    mainTheme                                   = `What is the main theme or message of the story: ${data.mainTheme}\n`;
    arcSupport                                  = `How does the narrative arc support this theme or message: ${data.arcSupport}\n`;
    audienceFeelings                            = `How should the audience feel after experiencing this story: ${data.audienceFeelings}\n`;
    
    const output                                =  storyPurpose + mainEvent + sequenceOfEvents + narrativeStyle + importantCharacter1 + importantCharacter2 + importantCharacter3 + importantCharacter4 + keyRelationships + normalDay1 + normalDay2 + normalDay3 + incitingEvent + challenges + escalation + choices + characterReactions + turningPoint + conflictResolution + consequences + aftermath + remainingConflicts + newChallenges + storyEnding + newNormal + characterChanges + lessonsLearned + mainTheme + arcSupport + audienceFeelings;
    const defineMainEventAndCharacters          = mainEvent + sequenceOfEvents + importantCharacter1 + importantCharacter2 + importantCharacter3 + importantCharacter4 + keyRelationships
    const normalDayAndIncitingIncident          = normalDay1 + normalDay2 + normalDay3 + normalDay4 + incitingEvent
    const challengesAndObstacles                = challenges + escalation 
    const characterChoicesAndReactions          = choices + characterReactions
    const peakAndTurningPoint                   = turningPoint
    const climaxAndImmediateConsequences        = conflictResolution + consequences 
    const exploreAfterMath                      = aftermath + remainingConflicts
    const conclusion                            = newChallenges + storyEnding + characterChanges + newNormal
    const postConclusion                        = lessonsLearned + mainTheme + arcSupport

    console.log(
        "defineMainEventAndCharacters = " + defineMainEventAndCharacters          
        ,"normalDayAndIncitingIncident = " + normalDayAndIncitingIncident          
        ,"challengesAndObstacles = " + challengesAndObstacles                
        ,"characterChoicesAndReactions = " + characterChoicesAndReactions          
        ,"peakAndTurningPoint = " + peakAndTurningPoint                   
        ,"climaxAndImmediateConsequences = " + climaxAndImmediateConsequences        
        ,"exploreAfterMath = " + exploreAfterMath                      
        ,"conclusion = " + conclusion                            
        ,"postConclusion = " + postConclusion                        
    );
    fs.writeFileSync(promptOutput + '.txt', output);
    res.send('Form data has been written to output.txt');
});




app.listen(3000, () => console.log('Server running on port 3000'));
