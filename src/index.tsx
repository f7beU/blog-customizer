import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// console.log('начну хоть с чего-то');

	// новое состояние для применённых настроек
	const [appliedSettings, setAppliedSettings] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<>
			<main
				className={styles.main}
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
				{
					<ArticleParamsForm
						currentSettings={appliedSettings}
						applySettings={setAppliedSettings}
					/>
				}
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
