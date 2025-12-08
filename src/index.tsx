import { createRoot } from 'react-dom/client';
import React, { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [tempState, setTempState] =
		useState<ArticleStateType>(defaultArticleState);

	const [appliedState, setAppliedState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleSettingChange =
		(key: keyof ArticleStateType) => (option: OptionType) => {
			setTempState((prev) => ({ ...prev, [key]: option }));
		};

	const handleApply = () => {
		setAppliedState(tempState);
	};

	const handleReset = () => {
		setTempState(defaultArticleState);
		setAppliedState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedState.fontFamilyOption.value,
					'--font-size': appliedState.fontSizeOption.value,
					'--font-color': appliedState.fontColor.value,
					'--container-width': appliedState.contentWidth.value,
					'--bg-color': appliedState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={tempState}
				onSettingChange={handleSettingChange}
				onApply={handleApply}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
