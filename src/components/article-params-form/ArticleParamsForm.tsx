import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from '../../ui/text';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	OptionType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

interface IArticleParamsFormProps {
	onChange: React.Dispatch<
		React.SetStateAction<{
			fontFamilyOption: OptionType;
			fontColor: OptionType;
			backgroundColor: OptionType;
			contentWidth: OptionType;
			fontSizeOption: OptionType;
		}>
	>;
}

export const ArticleParamsForm = ({ onChange }: IArticleParamsFormProps) => {
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (evt: MouseEvent) => {
		if (
			sidebarRef.current &&
			!sidebarRef.current.contains(evt.target as HTMLElement)
		) {
			setIsOpened(false);
		}
	};

	useEffect(() => {
		if (isOpened) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpened]);

	const handleChanges = (fieldTitle: string) => {
		return (value: OptionType) => {
			setFormState((prev) => ({ ...prev, [fieldTitle]: value }));
		};
	};

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		onChange(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onChange(defaultArticleState);
	};
	return (
		<>
			<ArrowButton isOpen={isOpened} onClick={() => setIsOpened(!isOpened)} />
			<aside
				id='sidebar'
				ref={sidebarRef}
				className={clsx(styles.container, isOpened && styles.container_open)}>
				<form className={styles.form}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleChanges('fontFamilyOption')}></Select>
					<RadioGroup
						title='Размер шрифта'
						name='fontSizeOption'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChanges('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={handleChanges('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={handleChanges('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={handleChanges('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleSubmit}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
