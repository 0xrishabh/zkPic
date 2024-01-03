use dep::std;

global DEPTH: Field = 4000;

fn resize<N>(
    orig_image: [u32; N],
    new_image: [u32; N],
    orig_length: u32,
    orig_width: u32,
    new_length: u32,
    new_width: u32,
){
    let orig_height = orig_length / orig_width;
    let new_height = new_length / new_width;
    let denom = (new_width - 1) * (new_height - 1);

    for ind in 0..new_image.len(){
        if (ind as u32) < (new_length) {
            // Getting the 2d coordinates of the pixel in the new image
            let i = (ind as u32) / new_height;
            let j = (ind as u32) % new_width;

            // Calculating the coordinate of the lower bound pixel in the original image
            let x_l =  (orig_width - 1) * j / (new_width - 1);
			let y_l =  (orig_height - 1) * i / (new_height - 1);

            // Getting the coordinate of the upper bound pixel in the original image
            let mut x_h = x_l;
            let mut y_h = y_l;

            if x_l * (new_width - 1) != (orig_width - 1) * j {
                x_h += 1;
            } 
            if y_l * (new_height - 1) != (orig_height - 1) * i {
                y_h += 1;
            }

            let xRatioWeight = ((orig_width - 1) * j) - (new_width - 1)*x_l;
			let yRatioWeight = ((orig_height - 1) * i) - (new_height - 1)*y_l;

            let sum = orig_image[y_l * orig_height + x_l] * (new_width - 1 - xRatioWeight) * (new_height - 1 - yRatioWeight)
                    + orig_image[y_l * orig_height + x_h] * xRatioWeight * (new_height - 1 - yRatioWeight)
                    + orig_image[y_h * orig_height + x_l] * yRatioWeight * (new_width - 1 - xRatioWeight)
                    + orig_image[y_h * orig_height + x_h] * xRatioWeight * yRatioWeight;

            

            // std::println("------------------");
            // std::println(new_image[ind]);
            // std::println(sum / denom);
            // // std::println(sum - (new_image[ind] * denom));
            // std::println(new_image[ind]  == sum / denom);
            // // std::println(y_l * orig_height + x_l);
            // // std::println(y_l * orig_height + x_h);
            // // std::println(y_h * orig_height + x_l);
            // // std::println(y_h * orig_height + x_h);
            // // std::println("------------------");
            assert(new_image[ind] == sum / denom);
        }       
    }
}

fn main(
    orig_image: [u32; DEPTH],
    new_image: [u32; DEPTH],
    orig_len: u32,
    orig_width: u32,
    new_length: u32,
    new_width: u32,
){
    resize(orig_image, new_image, orig_len, orig_width, new_length, new_width);
}



#[test]
fn test_gray_pass(){
	let mut orig_image = [0; DEPTH];
    orig_image[0] = 122;
    orig_image[1] = 165;
    orig_image[2] = 165;
    orig_image[3] = 122;
    
	let mut new_image = [0; DEPTH];
    new_image[0] = 122;
    new_image[1] = 136;
    new_image[2] = 150;
    new_image[3] = 165;

    new_image[4] = 136;
    new_image[5] = 141;
    new_image[6] = 145;
    new_image[7] = 150;

    new_image[8] = 150;
    new_image[9] = 145;
    new_image[10] = 141;
    new_image[11] = 136;

    new_image[12] = 165;
    new_image[13] = 150;
    new_image[14] = 136;
    new_image[15] = 122;


    // let mut new_image = [0; DEPTH];
    // new_image[0] = 122;
    // new_image[1] = 132;
    // new_image[2] = 154;
    // new_image[3] = 165;

    // new_image[4] = 132;
    // new_image[5] = 138;
    // new_image[6] = 148;
    // new_image[7] = 154;

    // new_image[8] = 154;
    // new_image[9] = 148;
    // new_image[10] = 138;
    // new_image[11] = 132;

    // new_image[12] = 165;
    // new_image[13] = 154;
    // new_image[14] = 132;
    // new_image[15] = 122;

	main(
		orig_image,
		new_image,
        4, // orig_length
        2, // orig_width
        16, // new_length
        4 // new_width
	);
    std::println("Test passed!")
}