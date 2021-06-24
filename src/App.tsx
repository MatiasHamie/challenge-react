import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import { store } from "./redux/store/store";
import "animate.css";
export const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
