import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

import { ArrowButton } from './ui/arrow-button';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// console.log('начну хоть с чего-то');

	// состояние для открытия сайдбара
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	// console.log('Состояние isSidebarOpen = ', isSidebarOpen);

	// новое состояние для применённых настроек
	const [appliedSettings, setAppliedSettings] =
		useState<ArticleStateType>(defaultArticleState);

	// для сайдбара
	const sidebarRef = useRef<HTMLElement>(null);

	// для стрелки
	const arrowRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// если сайдбар закрыт, ничего не делаем
		if (!isSidebarOpen) return;

		const clickedMouseOutside = (event: MouseEvent) => {
			// проверяем, был ли клик внутри сайдбара
			const isClickInsideSidebar = sidebarRef.current?.contains(
				event.target as Node
			);
			// if (isClickInsideSidebar) {
			// 	console.log('Клик произошёл на сайдбаре');
			// }
			// проверяем, был ли клик на стрелке
			const isClickOnArrow = arrowRef.current?.contains(event.target as Node);
			// if (isClickOnArrow) {
			// 	console.log('Клик произошёл на стрелке');
			// }
			if (!isClickInsideSidebar && !isClickOnArrow) {
				console.log('Клик вне стрелки и сайдбара');
				// закрываем сайдбар
				setIsSidebarOpen(false);
			}
		};

		// добавляем обработчик
		document.addEventListener('mousedown', clickedMouseOutside);

		// удаляем обработчик при размонтировании или при изменении isSidebarOpen
		return () => {
			document.removeEventListener('mousedown', clickedMouseOutside);
		};
		// эффект перезапускается при изменении isSidebarOpen
	}, [isSidebarOpen]);

	return (
		<>
			<ArrowButton
				ref={arrowRef}
				isOpen={isSidebarOpen}
				onClick={() => {
					// console.log("клик из App, isSidebarOpen: ", isSidebarOpen);
					setIsSidebarOpen((prev) => !prev);
				}}
			/>
			<main
				className={clsx(styles.main)}
				style={
					{
						// используем appliedSettings вместо defaultArticleState
						'--font-family': appliedSettings.fontFamilyOption.value,
						'--font-size': appliedSettings.fontSizeOption.value,
						'--font-color': appliedSettings.fontColor.value,
						'--container-width': appliedSettings.contentWidth.value,
						'--bg-color': appliedSettings.backgroundColor.value,
					} as CSSProperties
				}>
				{isSidebarOpen && (
					<ArticleParamsForm
						ref={sidebarRef}
						isOpen={isSidebarOpen}
						currentSettings={appliedSettings}
						applySettings={setAppliedSettings}
					/>
				)}
				<Article />
			</main>
		</>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
