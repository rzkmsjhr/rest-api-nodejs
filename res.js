'use strict';

exports.ok = function(values, res){
    var data = {
        'status':200,
        'values':values
    };

    res.json(data);
    res.end();
};

//response nested json matakuliah
exports.nested = function(values, res){
    //collect matakuliah data
    const result = values.reduce((collection, item)=>{
        //key of group
        if(collection[item.nim]){
            //group of mahasiswa based on NIM variable
            const group = collection[item.nim];
            //check if the array contain matakuliah
            if(Array.isArray(group.matakuliah)){
                //add to matakuliah collection
                group.matakuliah.push(item.matakuliah);
            }
            else {
                group.matakuliah = [group.matakuliah, item.matakuliah];
            }
        }
        else{
            collection[item.nim] = item;
        }
        return collection;
    }, {});

    var data = {
        'status':200,
        'values':result
    };

    res.json(data);
    res.end();
}