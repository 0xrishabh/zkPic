use dep::std;

global DEPTH: Field = 4000;
fn main(
	orig_image_r: [u32; DEPTH],
	orig_image_g: [u32; DEPTH],
	orig_image_b: [u32; DEPTH],
	gray_image: [u32; DEPTH],
	orig_image_length: u32,
	gray_image_length: u32,
) {
	assert(orig_image_length == gray_image_length);

	let mut orig_image: [(u32, u32, u32); DEPTH] = [(0,0,0); DEPTH];

	let mut temp = 0;
	for index in 0..DEPTH{
		orig_image[index] = (orig_image_r[index], orig_image_g[index], orig_image_b[index]);
	}
	for index in 0..orig_image.len(){
		if (index as u32 <= orig_image_length as u32) {
			let curr_pixel = orig_image[index];
			let mut gray_pixel_given = gray_image[index];
			let gray_pixel_calculated = (30*curr_pixel.0) + (59*curr_pixel.1) + (11*curr_pixel.2);
			let diffX = 100*gray_pixel_given - gray_pixel_calculated;
			let diffY = gray_pixel_calculated - 100*gray_pixel_given;
		
			assert(diffX < 1000 | diffY < 1000);
		}
		
	}	
}