'use strict';

//setup our datastore
const Datastore = require('@google-cloud/datastore');
const datastore = new Datastore({namespace: 'paas'});

//setup the ey to find entries in datastore
function key(reg) {
  return datastore.key(['Register', reg]);
}

//if no register exists create a register and assign a number to it
//else add the number in body to it
module.exports.post = async (reg, num) => { 
  let taskKey = key(reg);
  const [data] = await datastore.get(taskKey);
  if (data && data.val) {
    num += data.val;
    datastore.save({ key: taskKey, data: { name: reg, num } });
    return num;
  }else{
    datastore.save({ key: taskKey, data: { name: reg, num } });
    return num;
  }
};

//retrieve the number in a named register, 0 if does not exist
module.exports.get = async (reg) => { 
  const [data] = await datastore.get(key(reg));
  if (data && data.val) return data.val;
  return '0';
};

//set the value of a register ot a number
module.exports.put = (reg, num) => { 
  return datastore.save({ key: key(reg), data: { name: reg, num } });
};

//delete a register
module.exports.delete = async (reg) => { 
  let taskKey = key(reg);
  let [data] = await datastore.get(taskKey);
  if(data && data.val) datastore.delete(taskKey);
  return;
};
