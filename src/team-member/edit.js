import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function Edit({ attributes, setAttributes }) {
	const { name, bio } = attributes;
	const onChangeName = (newName) => {
		setAttributes({ name: newName });
	};
	const onChangeBio = (newBio) => {
		setAttributes({ bio: newBio });
	};
	return (
		<div {...useBlockProps()}>
			<RichText
				placeholder={__('Member Name', 'team-members')}
				tagName="h4"
				onChange={onChangeName}
				value={name}
				allowedFormats={['']}
			></RichText>
			<RichText
				placeholder={__('Member BIO', 'team-members')}
				tagName="p"
				onChange={onChangeBio}
				value={bio}
				allowedFormats={['']}
			></RichText>
		</div>
	);
}
