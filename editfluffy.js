const { readFile, writeFile } = require('fs/promises');

async function editFluffy() {
  try {
    const content = await readFile('./problem1.json', { encoding: 'utf8' });
    console.log("1 - The content of problem1.json");
    console.log(content);
    console.log();

    const parsedContent = JSON.parse(content);
    parsedContent.weight = 6;
    parsedContent.height = 20;
    await writeOutput('fluffy_modified', parsedContent);

    parsedContent.name = "Fluffyy";
    await writeOutput('fluffy_modified', parsedContent);

    console.log(`4 - ${parsedContent.name}'s friends activities :-`);
    for (let friend of parsedContent.catFriends) {
      console.log(friend.name, friend.activities);
    }
    console.log();

    console.log("5 - Cate friends names are :-");
    for (let friend of parsedContent.catFriends) {
      console.log(friend.name);
    }
    console.log();

    let totalWeight = 0;
    for (let friend of parsedContent.catFriends) {
      totalWeight += friend.weight;
    }
    console.log(`6 - Cat Friends total weight is:`, totalWeight);
    console.log();

    let totalActivities = 0;
    console.log("7 - The total activities of Cat Friends: ");
    for (let friend of parsedContent.catFriends) {
      console.log(friend.name);
      for (let activity of friend.activities) {
        console.log('- ', activity);
        totalActivities++;
      }
    }
    console.log("The total activities of Cat Friends: ", totalActivities);
    console.log();

    let [bar, foo] = parsedContent.catFriends;
    bar.activities.push('Playing with String Ball');
    bar.activities.push('Chasing Rats');
    foo.activities.push('Running around');
    foo.activities.push('Playing with shoes');
    await writeOutput('fluffy_modified', parsedContent);

    let [updatedBar] = parsedContent.catFriends;
    updatedBar.furcolor = "Brown";
    await writeOutput('fluffy_modified', parsedContent);

    await writeOutput('fluffy_modified', parsedContent);

 
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function writeOutput(fileName, content) {
  await writeFile(`./${fileName}.json`, JSON.stringify(content));
}

editFluffy();
