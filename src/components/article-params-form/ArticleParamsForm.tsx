import { useState, useRef, useEffect, FormEvent } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type Props = {
	currentState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ currentState, onApply }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(currentState);
	const sidebarRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleOutsideClick = (e: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(e.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleOutsideClick);
		return () => document.removeEventListener('mousedown', handleOutsideClick);
	}, [isOpen]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(opt) =>
							setFormState({ ...formState, fontFamilyOption: opt })
						}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(opt) =>
							setFormState({ ...formState, fontSizeOption: opt })
						}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(opt) => setFormState({ ...formState, fontColor: opt })}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(opt) =>
							setFormState({ ...formState, backgroundColor: opt })
						}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(opt) =>
							setFormState({ ...formState, contentWidth: opt })
						}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
