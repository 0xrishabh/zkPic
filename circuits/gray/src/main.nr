global DEPTH: Field = 4000;

// It verifies that the gray_image is equal to grayscale of the orig_image
// @parma orig_image: the original image
// @param gray_image: the gray image
fn gray<N>(orig_image: [(u32, u32, u32); N], gray_image: [u32; N]) {
    for i in 0..N {
        let orig_image_r = orig_image[i].0;
        let orig_image_g = orig_image[i].1;
        let orig_image_b = orig_image[i].2;

        let mut gray_pixel_given = 100 * gray_image[i];
        let gray_pixel_calculated = 30 * orig_image_r + 59 * orig_image_g + 11 * orig_image_b;
        if gray_pixel_calculated > gray_pixel_given {
            assert(gray_pixel_calculated - gray_pixel_given < 100);
        } else {
            assert(gray_pixel_given - gray_pixel_calculated < 100);
        }
    }
}

fn main(orig_image: [(u32, u32, u32); DEPTH], gray_image: [u32; DEPTH]) {
    gray(orig_image, gray_image);
}

#[test]
fn test_gray_pass() {
    let mut orig_image: [(u32, u32, u32); DEPTH] = [(0, 0, 0); DEPTH];

    orig_image[0] = (150, 93, 200);
    orig_image[1] = (45, 239, 97);
    orig_image[2] = (150, 93, 200);
    orig_image[3] = (45, 239, 97);
    orig_image[4] = (150, 93, 200);
    orig_image[5] = (45, 239, 97);

    let mut gray_image = [0; DEPTH];
    gray_image[0] = 122;
    gray_image[1] = 165;
    gray_image[2] = 122;
    gray_image[3] = 165;
    gray_image[4] = 122;
    gray_image[5] = 165;

    main(orig_image, gray_image);
}
