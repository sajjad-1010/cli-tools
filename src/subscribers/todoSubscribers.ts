import eventBus from "../utils/eventBus";

eventBus.on("todo:added", (todo) => {
  console.log('✅ New todo added:', todo);
});