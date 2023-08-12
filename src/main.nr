use dep::std;
fn remainder(x: u8, y: u8) -> u8 {x - y * (x / y)}
// It verifies that the new_image is a crop of the orig_image
// @param orig_image: the original image
// @param new_image: the new image
// @param rl: the lenght of th row in the original image
// @param x: the x coordinate of the top left corner of the crop
// @param y: the y coordinate of the top left corner of the crop
// @param w: the width of the crop
// @param h: the height of the crop

fn crop(
	orig_image: [(Field,Field,Field)], 
	new_image: [(Field,Field,Field)],
	row_length: u8, 
	col_length: u8,
	col_start: u8, 
	row_start: u8, 
	width_new: u8, 
	height_new: u8
) {
	let orig_image_length = orig_image.len();
	let mut new_index = 0;
	for index in 0..orig_image_length{
		let row_i = (index as u8) / row_length;
		let col_i = remainder((index as u8), col_length);
		let row_end = row_start+width_new;
		let col_end = col_start+height_new;
		if row_i >= row_start & row_i <= row_end {
			if col_i >= col_start & col_i <= col_end {
				std::println(row_i);
				std::println(col_i);
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
	let orig_image = [
		(1, 2, 3), (1, 2, 3), (1, 2, 3), (1, 2, 3), 
		(1, 2, 3), (3, 2, 1), (3, 2, 1), (1, 2, 3), 
		(1, 2, 3), (3, 2, 1), (3, 2, 1), (1, 2, 3), 
		(1, 2, 3), (1, 2, 3), (1, 2, 3), (1, 2, 3)
	]; 
	let new_image = [
		(3, 2, 1), (3, 2, 1),
		(3, 2, 1), (3, 2, 1)
	];
	let row_length = 4; 
	let col_length = 4;
	let col_start = 1;
	let row_start = 1; 
	let width_new = 1; 
	let height_new = 1;
    crop(
		orig_image,
		new_image,
		row_length,
		col_length,
		col_start,
		row_start,
		width_new,
		height_new
	);   
}
#[test]
fn test_crop_fail() {
	let orig_image = [
		(1, 2, 3), (1, 2, 3), (1, 2, 3), (1, 2, 3), 
		(1, 2, 3), (3, 2, 1), (3, 2, 1), (1, 2, 3), 
		(1, 2, 3), (3, 2, 1), (3, 2, 1), (1, 2, 3), 
		(1, 2, 3), (1, 2, 3), (1, 2, 3), (1, 2, 3)
	]; 
	let new_image = [
		(3, 2, 1), (3, 2, 1),
		(3, 2, 1), (3, 2, 4)
	];
	let row_length = 4; 
	let col_length = 4;
	let col_start = 1;
	let row_start = 1; 
	let width_new = 1; 
	let height_new = 1;
    crop(
		orig_image,
		new_image,
		row_length,
		col_length,
		col_start,
		row_start,
		width_new,
		height_new
	);   
}
