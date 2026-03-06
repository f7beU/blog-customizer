import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

import { forwardRef } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	isOpen: boolean;
	onClick: OnClick;
};

export const ArrowButton = forwardRef<HTMLDivElement, ArrowButtonProps>(
	({ isOpen, onClick }, ref) => {
		// console.log('Пришло из App:', { isOpen, onClick });
		// console.log('тип onClick:', typeof onClick);

		return (
			/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
			<div
				ref={ref} // теперь ref привязан к этому div
				role='button'
				aria-label='Открыть/Закрыть форму параметров статьи'
				tabIndex={0}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				onClick={onClick}>
				<img
					src={arrow}
					alt='иконка стрелочки'
					className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
				/>
			</div>
		);
	}
);
ArrowButton.displayName = 'ArrowButton';
