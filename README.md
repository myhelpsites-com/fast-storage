# Fast Storage React Native / Expo
Este projeto tem como objetivo tornar a utilização do `AsyncStorage` mais rapida e de fato assincrona com um hook personalizado que criamos.

### Como usar
`Fast Storage React Native` possui funções que dispensam a instalação do `AsyncStorage` em seu projeto local ok?
_
- `createDataBase`: Como proprio nome diz essa função é usada para criar um banco de dados.
Caso de uso: 

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