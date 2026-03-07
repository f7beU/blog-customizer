import { ArrowButton } from 'src/ui/arrow-button';
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

import { useState, useRef, useEffect } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	// текущие применённые настройки
	currentSettings: ArticleStateType;
	// функция для применения настроек
	applySettings: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentSettings,
	applySettings,
}: ArticleParamsFormProps) => {
	console.log('Форма открылась');

	// состояние для открытия сайдбара
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	// console.log('Состояние isSidebarOpen = ', isSidebarOpen);

	// создаём ref формы
	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// если панель закрыта, ничего не делаем
		if (!isSidebarOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			// проверяем, был ли клик внутри нашей формы
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				// если клик снаружи — закрываем
				setIsSidebarOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
		// эффект перезапускается при изменении isOpen
	}, [isSidebarOpen]);

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
			<div ref={formRef}>
				<ArrowButton
					isOpen={isSidebarOpen}
					onClick={() => {
						// console.log("клик из формы, isSidebarOpen: ", isSidebarOpen);
						setIsSidebarOpen((prev) => !prev);
					}}
				/>
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isSidebarOpen,
					})}>
					<form
						className={styles.form}
						onSubmit={(event) => {
							event.preventDefault();
							handleApply();
						}}
						onReset={() => handleReset()}>
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
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
ArticleParamsForm.displayName = 'ArticleParamsForm';
