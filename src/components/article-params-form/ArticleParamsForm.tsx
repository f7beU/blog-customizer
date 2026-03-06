import { Button } from 'src/ui/button';

import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import { forwardRef, useState } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	// открыт ли сайдбар
	isOpen: boolean;
	// текущие применённые настройки
	currentSettings: ArticleStateType;
	// функция для применения настроек
	applySettings: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = forwardRef<
	HTMLElement,
	ArticleParamsFormProps
>(({ isOpen, currentSettings, applySettings }, ref) => {
	console.log('Форма открылась');

	// состояние формы при открытии с выбранными настройками
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(currentSettings);
	console.log('Выбранные настройки', formSettings);

	// обработчик для кнопки "Применить"
	const handleApply = () => {
		console.log("Есть нажатие на кнопку 'Применить'");
		// вызываем функцию и передаём ей локальные настройки
		applySettings(formSettings);
	};

	// обработчик для кнопки "Сбросить"
	const handleReset = () => {
		console.log("Есть нажатие на кнопку 'Сбросить'");
		// сбрасываем состояние внутри формы  на дефолт
		// console.log(defaultArticleState)
		setFormSettings(defaultArticleState);
		// сразу применяем дефолтные настройки используя функцию onApply
		applySettings(defaultArticleState);
	};

	return (
		<>
			<aside
				ref={ref}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={(event) => event.preventDefault()}>
					<Text size={31} weight={800}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formSettings.fontFamilyOption}
						onChange={(value) =>
							setFormSettings({ ...formSettings, fontFamilyOption: value })
						}
						placeholder='Выберите шрифт'
					/>
					<RadioGroup
						name='Размер шрифта'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formSettings.fontSizeOption}
						onChange={(value) =>
							setFormSettings({ ...formSettings, fontSizeOption: value })
						}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formSettings.fontColor}
						onChange={(value) =>
							setFormSettings({ ...formSettings, fontColor: value })
						}
						placeholder='Выберите цвет шрифта'
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formSettings.backgroundColor}
						onChange={(value) =>
							setFormSettings({ ...formSettings, backgroundColor: value })
						}
						placeholder='Выберите цвет фона'
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formSettings.contentWidth}
						onChange={(value) =>
							setFormSettings({ ...formSettings, contentWidth: value })
						}
						placeholder='Выберите ширину контента'
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
							onClick={handleApply}
						/>
					</div>
				</form>
			</aside>
		</>
	);
});
ArticleParamsForm.displayName = 'ArticleParamsForm';
