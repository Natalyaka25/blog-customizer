import { CSSProperties, useState } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';
import { ArticleParamsForm } from './components/article-params-form';
import { Article } from './components/article';
import styles from './styles/index.module.scss';

export const App = () => {
	const [appliedState, setAppliedState] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': appliedState.fontFamilyOption.value,
					'--font-size': appliedState.fontSizeOption.value,
					'--font-color': appliedState.fontColor.value,
					'--container-width': appliedState.contentWidth.value,
					'--bg-color': appliedState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setAppliedState={setAppliedState} />
			<Article />
		</main>
	);
};
