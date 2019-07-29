const redux = require("redux");

const createAddProject = (item) => {
  const actionObj = {
    type: "ADD_PROJECT",
    project: item,
  };
  return actionObj;
};

const createRemoveProject = (item) => {
  const actionObj = {
    type: "REMOVE_PROJECT",
    project: item,
  };
  return actionObj;
};

const patchProject = (item) => {
  const actionObj = {
    type: "PATCH_PROJECT",
    project: item,
  };
  return actionObj;
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_PROJECT": {
      const id = Math.floor(Math.random() * 10000);
      action.project.id = id;
      return [...state, action.project];
    }
    case "REMOVE_PROJECT": {
      return state.filter((proj) => {
        return proj.id !== Number(action.project.projectId);
      });
    }
    case "PATCH_PROJECT": {
      const { param, body } = action.project;
      state.map((item) =>
        item.id === Number(param) ? Object.assign(item, body) : item
      );
      return state;
    }
  }
  return state;
};

const store = redux.createStore(reducer);

module.exports = { store, patchProject, createAddProject, createRemoveProject };
