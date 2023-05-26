function GetItemsByName (test) {
    // returns array of found matches
    if (!nameString) {
      return false;
    }
    var matches = [];

    for (var i = 1; i <= app.project.numItems; i++) {
      var crnt = app.project.item(i);
      var crntName = crnt.name;

      var isAMatch =
        nameString && crntName.indexOf(nameString) > -1 ? true : false;
      if (isAMatch) {
        matches.push(crnt);
      }
    }
    return matches;
  };