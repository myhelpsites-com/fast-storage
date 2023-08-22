const { default: AsyncStorage } = require("@react-native-async-storage/async-storage");

async function createDataBase(dataBase) { // Get data in asyncStorage
    try {
        AsyncStorage.setItem("@server", JSON.stringify({}));
        console.log("teste")
        return "Database created"
    } catch (error) {
        console.error(error)
        return Promise.reject()
    }
}

module.exports = { createDataBase }