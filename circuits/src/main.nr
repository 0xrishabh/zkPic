use dep::std;
fn remainder(x: u8, y: u8) -> u8 {x - y * (x / y)}
// It verifies that the new_image is a crop of the orig_image
// @param orig_image: the original image
// @param new_image: the new image
// @param orig_image_width: the width of the original image
// @param orig_image_height: the height of the original image
// @param x: the x coordinate of the top left corner of the new image
// @param y: the y coordinate of the top left corner of the new imagep
// @param orig_image_width: the width of the new image
// @param new_image_height: the height of the new image

fn crop(
	orig_image: [(Field,Field,Field)], 
	new_image: [(Field,Field,Field)],
	orig_image_width: u8, 
	orig_image_height: u8,
	x: u8, 
	y: u8, 
	new_image_width: u8, 
	new_image_height: u8
) {
	let orig_image_length = orig_image.len();
	let mut new_index = 0;
	let row_end = x+new_image_width;
	let col_end = y+new_image_height;
	for index in 0..orig_image_length{
		let row_i = (index as u8) / orig_image_width;
		let col_i = remainder((index as u8), orig_image_height);
		if row_i >= x & row_i < row_end {
			if col_i >= y & col_i < col_end {
				assert(orig_image[index].0 == new_image[new_index].0);
				assert(orig_image[index].1 == new_image[new_index].1);
				assert(orig_image[index].2 == new_image[new_index].2);
				new_index+=1;
			}
		}
	}
}


#[test]
fn test_crop_pass() {
	// Representing a image of 4x4 pixels
	let orig_image = [
		(1, 2, 3), (1, 2, 3), (1, 2, 3), (1, 2, 3), 
		(1, 2, 3), (3, 2, 1), (3, 2, 1), (1, 2, 3), 
		(1, 2, 3), (3, 2, 1), (3, 2, 1), (1, 2, 3), 
		(1, 2, 3), (1, 2, 3), (1, 2, 3), (1, 2, 3)
	];
	// Representing a image of 2x2 pixels
	let new_image = [
		(3, 2, 1), (3, 2, 1),
		(3, 2, 1), (3, 2, 1)
	];

	let orig_image_width = 4; 
	let orig_image_height = 4;
	let new_image_width = 2; 
	let new_image_height = 2;

	// Starting coordinates of the crop image
	let x = 1;
	let y = 1; 
	
	// should fail if the crop is not correct
    crop(
		orig_image,
		new_image,
		orig_image_width,
		orig_image_height,
		x,
		y,
		new_image_width,
		new_image_height
	);   
}
