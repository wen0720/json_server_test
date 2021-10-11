// ref. https://stackoverflow.com/questions/57868537/post-collection-of-objects-in-json-server
// ref. https://keyholesoftware.com/2020/03/16/mock-restful-server-fast-with-json-server/

const path = require('path');
const jsonServer = require('json-server');
const _jsonExtender = require('json-server-extension');

//options:
//fullPath:fullpath for the combined object
//generatedPath:the path where the generated files will be found
//staticPath:the path where the static files will be found
const jsonExtender = new _jsonExtender({filePath: path.join(__dirname, './db_extends.json'),
                                        generatedPath: path.join(__dirname, './generated'),
                                        staticPath: path.join(__dirname,'static')});

//register accacpt array of generators or path to the generator scripts
//const funcs =  Object.keys(generators).map(key => generators[key])
jsonExtender.register(path.join(__dirname, 'generators'));
jsonExtender.generate().then((data)=>{
  /* 產生檔案完畢，開始啟動 json-server */

  const server = jsonServer.create();
  const router = jsonServer.router(path.join(__dirname, 'db.json'));
  const middlewares = jsonServer.defaults();

  // const { db } = router;
  // 定義回傳格式
  router.render = (req, res) => {
    res.jsonp({
      succeeded: true,
      msg: null,
      data: res.locals.data,
    });
  };

  // Set default middlewares (logger, static, cors and no-cache)
  server.use(middlewares);

  // To handle POST, PUT and PATCH you need to use a body-parser
  // You can use the one used by JSON Server
  server.use(jsonServer.bodyParser);
  server.use((req, res, next) => {
    if (req.method === 'POST') {
      req.body.createdOn = +new Date();
    }
    // Continue to JSON Server router
    next();
  });

  // 於此之後，/api 都會拿掉，並保留原本路徑
  server.use(jsonServer.rewriter({
    '/api/*': '/$1',
  }));

  server.get('/error', (req, res) => {
    res.status(401).json({
      succeeded: 'ERROR',
      msg: '',
      data: null,
    }).end();
  });

  server.use(router);
  server.listen(3001, () => {
    console.log('====== JSON SERVER START AT PORT 3001 =======');
  });

  /* 產生檔案完畢，開始啟動 json-server */

}).catch((error) => {
  console.log(error.message, 'red')
})



// server.post('/:apiType', async (req, res, next) => {
//   const list = db.getState()[req.params.apiType];
//   // 新增
//   const newItems = {
//     ...req.body,
//     id: list.length,
//   };
//   list.push(newItems);
//   await db.write();
//   // res.status(200).json({
//   //   data: newItems,
//   // });
//   next();
// });

// server.put('/:apiType/:id', async (req, res) => {
//   const list = db.getState()[req.params.apiType];
//   // 修改
//   const editItemIndex = list.findIndex((todo) => todo.id === req.body.id);
//   if (editItemIndex >= 0) {
//     list[editItemIndex] = { ...req.body };
//     await db.write();
//     res.status(200).json({
//       succeeded: true,
//     });
//   } else {
//     res.status(200).json({
//       succeeded: false,
//       msg: '此 id 不存在',
//     });
//   }
// });

// server.delete('/:apiType/:id', async (req, res) => {
//   const list = db.getState()[req.params.apiType];
//   // 刪除
//   const deleteIndex = list.findIndex((todo) => Number(todo.id) === Number(req.params.id));
//   if (deleteIndex >= 0) {
//     list.splice(deleteIndex, 1);
//     await db.write();
//     res.status(200).json({
//       succeeded: true,
//     });
//   } else {
//     res.status(200).json({
//       succeeded: false,
//       msg: '此 id 不存在',
//     });
//   }
// });
