import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { pagesConfig } from './pages.config';
import PageNotFound from './lib/PageNotFound';

const { Pages, mainPage } = pagesConfig;
const MainPage = Pages[mainPage] ?? Object.values(Pages)[0];

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {Object.entries(Pages).map(([path, Page]) => (
          <Route key={path} path={`/${path}`} element={<Page />} />
        ))}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
