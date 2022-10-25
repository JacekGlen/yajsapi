export default function get_event_loop() {
  return {
    create_task: (fn) => new Promise((resolve, reject) => {
      fn().then((result) => {
        resolve(result);
      }).catch (error => {
        reject(error)
      });
      //fn().then((result) => resolve(result)).catch (error => reject(error));
    })
  };
}
//
//
// export default function get_event_loop() {
//   return {
//     create_task: bluebird.coroutine(function* (fn): any {
//       return yield new bluebird.Promise(async (resolve, reject, onCancel) => {
//         try {
//           const result = await fn();
//           resolve(result);
//         } catch (error) {
//           reject(error);
//         }
//         if (onCancel)
//           onCancel(() => {
//             logger.warn("cancelled!");
//             reject("cancelled!");
//           });
//       });
//     }) as any,
//   };
// }
