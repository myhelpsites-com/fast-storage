const { default: AsyncStorage } = require("@react-native-async-storage/async-storage");
const { useState, useEffect } = require("react");

async function createDataBase(name, data = {}) { // Get data in asyncStorage
    try {
        await AsyncStorage.setItem(name, JSON.stringify(data));
        console.log("teste")
        return "Database created"
    } catch (error) {
        console.error(error)
        return Promise.reject()
    }
}

async function dataBaseExist(name) { // Get data in asyncStorage
    try {
        const data = await AsyncStorage.getItem(name);
        if (data !== null) {
            return {exist: true}
        }else{
            return Promise.reject({error: "Database not exist", exist: false})
        }
    } catch (error) {
        console.error(error)
        return Promise.reject({error: "Database not exist", exist: false})
    }
}

function useDataBase(name){
    const [loadingData, setLoadingData] = useState(true); // State verify if loading
    const [dataBase, setDataBase] = useState({}); // State storage
    const [countUpdate, setCountUpdate] = useState(0); // Update count

    useEffect(() => { // Get first data
        handleGetAsyncDataBase();
    }, []);

    useEffect(() => { // Monitoring update dataBase state and update Storage
        if (countUpdate === 0) { // If first update we dont send asyncStorage, but update count
            setCountUpdate(1)
        } else { // Else we send asyncStorage
            handleSetAsyncDataBase();
        }
    }, [dataBase]);

    useEffect(()=>{
        if(!loadingData){
            console.log("[FAST-STORAGE]: Finish loading")
        }
    },[loadingData]);

    function createTable(tableName, data = {}) { // create new table
        dataBase[tableName] = data;
        setDataBase({ ...dataBase });
        return data
    }

    function selectTable(tableName, response = null) { // select line
        return dataBase && dataBase[tableName] ? dataBase[tableName] : response;
    }

    function updateTable(tableName, data = {}) { // update all table
        if (dataBase[tableName]) {
            dataBase[tableName] = data;
            setDataBase({ ...dataBase });
            return true

        } else {
            console.log("[FAST-STORAGE]: Table not exist")
            return null
        }
    }

    async function handleGetAsyncDataBase() { // Get data in asyncStorage
        setLoadingData(true);

        try {
            const database = await AsyncStorage.getItem(name);
            if (database !== null) {
                setDataBase(JSON.parse(database));
            }
            setLoadingData(false);
        } catch (error) {
            console.error(`[FAST-STORAGE]: database not exist`)
            setLoadingData(false);
        }
    }

    async function handleSetAsyncDataBase() { // Get data in asyncStorage
        try {
            AsyncStorage.setItem(name, JSON.stringify(dataBase));
        } catch (error) {
            console.error(`[FAST-STORAGE]: Error insert db`)
        }
    }
    return { loadingData, selectTable, updateTable, createTable, handleGetAsyncDataBase }
}

module.exports = { createDataBase, dataBaseExist, useDataBase }