# Fast Storage React Native / Expo
Este projeto tem como objetivo tornar a utilização do `AsyncStorage` mais rapida e de fato assincrona com um hook personalizado que criamos.

### Como usar
`Fast Storage React Native` possui funções que dispensam a instalação do `AsyncStorage` em seu projeto local ok?

#### Funções:
- useDataBase
- createDataBase
- dataBaseExist


#### Hooks do useData, dispensando o uso do async/await:
- `loadingData:` simbolo para mostrar quando o dado do `asyncStorage` veio para o `state`
- `selectTable:` Pega a tabela do banco de dados no `state`
- `updateTable:` Atualiza a tabela do banco de dados no `state`
- `createTable:` Cria uma tabela no banco de dados no `state`
- `unsetData:` Pega os dados do `asyncStorage` e passa no `state`

#### Outras funções:

- `createDataBase`: Essa função é usada para criar um banco de dados:

```
import { createDataBase } from 'fast-storage-react-native'

export function App(){
    const initalData = {
        fruits: ["apple", "banana"]
    };

    useEffect(()=>{
        handleCreateDataBase();
    },[]);

    async function handleCreateDataBase(){
        await createDataBase("@my_products", initalData); // initalData is optional
    }
}
```

- `dataBaseExist`: Essa função é usada para checar se existe um banco de dados especificos:

```
import { dataBaseExist } from 'fast-storage-react-native'

export function App(){

    useEffect(()=>{
        handleGetDataBase();
    },[]);

    async function handleGetDataBase(){
        try{
            const res = await dataBaseExist("@my_products"); // response exist true
        }catch (error){
            console.error(error)
        }
    }
}
```