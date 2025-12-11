import { useRef, useState } from 'react';
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
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
//import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { useClose } from 'src/ui/select/hooks/useClose';

interface ArticleParamsFormProps {
	setAppliedState: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { setAppliedState } = props;

	const [tempState, setTempState] =
		useState<ArticleStateType>(defaultArticleState);

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const formRef = useRef<HTMLElement>(null);

	// useOutsideClickClose({
	// 	isOpen,
	// 	rootRef,
	// 	onClose: () => setIsOpen(false),
	// 	onChange: setIsOpen,
	// });

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	useClose({
		isOpen: isMenuOpen,
		onClose: closeMenu,
		rootRef: formRef,
	});

	const handleSettingChange =
		(key: keyof ArticleStateType) => (option: OptionType) => {
			setTempState((prev) => ({ ...prev, [key]: option }));
		};

	const toggleForm = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setAppliedState(tempState);
	};

	const handleResetForm = (e: React.FormEvent) => {
		e.preventDefault();
		setTempState(defaultArticleState);
		setAppliedState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				ref={formRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleResetForm}>
					<Text weight={800} size={31} uppercase>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={tempState.fontFamilyOption}
						onChange={handleSettingChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={tempState.fontSizeOption}
						onChange={handleSettingChange('fontSizeOption')}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={tempState.fontColor}
						onChange={handleSettingChange('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator style={{ opacity: 0.25 }} />
					<Select
						options={backgroundColors}
						selected={tempState.backgroundColor}
						onChange={handleSettingChange('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={tempState.contentWidth}
						onChange={handleSettingChange('contentWidth')}
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
