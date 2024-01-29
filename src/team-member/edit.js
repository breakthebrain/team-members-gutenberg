import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { isBlobURL } from '@wordpress/blob';
import { Spinner, withNotices } from '@wordpress/components';

function Edit({ attributes, setAttributes, noticeOperations, noticeUI }) {
	const { name, bio, url, alt } = attributes;
	const onChangeName = (newName) => {
		setAttributes({ name: newName });
	};
	const onChangeBio = (newBio) => {
		setAttributes({ bio: newBio });
	};
	const onSelectImage = (image) => {
		if (!image || !image.url) {
			setAttributes({ url: undefined, id: undefined, alt: '' });
			return;
		}
		setAttributes({ url: image.url, id: image.id, alt: image.alt });
	};
	const onSelectURL = (newUrl) => {
		setAttributes({ url: newUrl, id: undefined, alt: '' });
	};
	const onUploadError = (message) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(message);
	};
	return (
		<div {...useBlockProps()}>
			{url && (
				<div
					className={`wp-block-blocks-course-team-member-img ${isBlobURL(url) ? 'is-loading' : ''}`}
				>
					<img src={url} alt={alt} />
					{isBlobURL(url) && <Spinner></Spinner>}
				</div>
			)}

			<MediaPlaceholder
				icon="admin-users"
				onSelect={onSelectImage}
				onSelectURL={onSelectURL}
				onError={onUploadError}
				// accept="image/*"
				disableMediaButtons={url}
				notices={noticeUI}
			></MediaPlaceholder>
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

export default withNotices(Edit);
