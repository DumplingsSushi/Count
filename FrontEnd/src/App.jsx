import React, { useEffect, useState } from "react"
import { Provider } from 'react-redux';
import store from "./Storage/Usersave";
import Userdata from "./Componenets/Userdata";
import Counter from "./Componenets/Counter"
import Textedit from "./Componenets/Texteditor";

export default function App() {
  return (
    <div className="flex ">
      <div className="w-fit">
        <Counter/>
        <Provider store={store}>
            <div className="App">
                <Userdata />
            </div>
        </Provider>
      </div>
      <Textedit/>
    </div>
  )
}
