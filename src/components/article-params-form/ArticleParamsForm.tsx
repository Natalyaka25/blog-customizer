import { useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	onSettingChange: (
		key: keyof ArticleStateType
	) => (option: OptionType) => void;
	onApply?: () => void;
	onReset?: () => void;
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { articleState, onSettingChange, onApply, onReset } = props;

	const [isOpen, setIsOpen] = useState(false);

	const toggleForm = () => {
		setIsOpen(!isOpen);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (onApply) {
			onApply();
		}
	};

	const handleResetForm = (e: React.FormEvent) => {
		e.preventDefault();
		if (onReset) {
			onReset();
		}
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleResetForm}>
					<Text weight={800} size={31} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={articleState.fontFamilyOption}
						onChange={onSettingChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={articleState.fontSizeOption}
						onChange={onSettingChange('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={articleState.fontColor}
						onChange={onSettingChange('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator style={{ opacity: 0.25 }} />
					<Select
						options={backgroundColors}
						selected={articleState.backgroundColor}
						onChange={onSettingChange('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={articleState.contentWidth}
						onChange={onSettingChange('contentWidth')}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
