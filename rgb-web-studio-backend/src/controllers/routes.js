const userController = require("./userController");
const fileController = require("./fileController");

const controllers = [
  { route: "/user", controller: userController },
  { route: "/files", controller: fileController },
];
const useRouter = function (expressApp) {
  controllers.forEach((controller) => {
    expressApp.use(controller.route, controller.controller);
  });
};

module.exports = { useRouter };
