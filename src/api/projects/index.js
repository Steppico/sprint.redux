const router = require("express").Router();
const builds = require("./builds");
const {
  store,
  patchProject,
  createAddProject,
  createRemoveProject,
} = require("../../redux");

router.get("/", (req, res) => {
  const state = { projects: store.getState() };
  res.status(200).json(state);
});

router.post("/", (req, res) => {
  const { project } = req.body;
  const state = { projects: store.dispatch(createAddProject(req.body)) };
  res.status(200).json(state);
});

// test is not working properly, passing to next one
router.get("/:projectId", (req, res) => {
  const { projectId } = req.params;
  const actualState = store.getState();
  const found = actualState.filter(
    (item) => item.id === Number(req.params.projectId)
  );
  // TODO retrieve and send project with given id
  res.status(200).json(found.pop());
});

router.patch("/:projectId", (req, res) => {
  const { projectId } = req.params;
  const { project } = req.body;
  const resolved = store.dispatch(
    patchProject({ param: projectId, body: req.body })
  );
  // TODO edit a projects information. Make sure to validate whats being sent!
  res.status(200).json(resolved);
});

router.delete("/:projectId", (req, res) => {
  const { projectId } = req.params;
  store.dispatch(createRemoveProject(req.params));
  res.sendStatus(200);
});

router.use("/:projectId/builds", builds);

module.exports = router;
