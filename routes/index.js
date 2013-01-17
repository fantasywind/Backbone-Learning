
/*
 * GET home page.
 */

exports.index = function(req, res){
  var alertTypes = {
    'alert-warning': '警告',
    'alert-success': '成功',
    'alert-danger': '錯誤',
    'alert-info': '資訊'
  };
  res.render('index', { title: 'Express', types: alertTypes });
};
