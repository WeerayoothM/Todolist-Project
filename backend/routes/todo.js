const router = require("express").Router();
const todoControllers = require("../controllers/todo");
const passport = require("passport");

const auth = passport.authenticate('jwt', { session: false })

router.get("/", auth, todoControllers.getAllTodos);
router.get("/:id", auth, todoControllers.getTodoById);
router.post("/", auth, todoControllers.createTodo);
router.put("/:id", auth, todoControllers.updateTodo);
router.delete("/:id", auth, todoControllers.deleteTodo);

module.exports = router;