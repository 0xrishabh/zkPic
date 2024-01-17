fn remainder(x: u8, y: u8) -> u8 {
    x - y * (x / y)
}
global DEPTH: Field = 4000;

fn crop<N>(
    orig_image: [(Field,Field,Field); N],
    new_image: [(Field,Field,Field); N],
    orig_image_width: u8,
    orig_image_height: u8,
    crop_offset_x: u8,
    crop_offset_y: u8,
    new_image_width: u8,
    new_image_height: u8
) {
    let orig_image_length = orig_image.len();
    let mut new_index = 0;
    let row_end = crop_offset_x + new_image_width;
    let col_end = crop_offset_y + new_image_height;
    for index in 0..orig_image_length {
        let row_i = (index as u8) / orig_image_width;
        let col_i = remainder((index as u8), orig_image_height);
        if col_i >= crop_offset_x & col_i < row_end {
            if row_i >= crop_offset_y & row_i < col_end {
                assert(orig_image[index].0 == new_image[new_index].0);
                assert(orig_image[index].1 == new_image[new_index].1);
                assert(orig_image[index].2 == new_image[new_index].2);
                new_index+=1;
            }
        }
    }
}

fn main(
    orig_image: [(Field,Field,Field); DEPTH],
    new_image: [(Field,Field,Field); DEPTH],
    orig_image_width: u8,
    orig_image_height: u8,
    crop_offset_x: u8,
    crop_offset_y: u8,
    new_image_width: u8,
    new_image_height: u8
) {
    crop(
        orig_image,
        new_image,
        orig_image_width,
        orig_image_height,
        crop_offset_x,
        crop_offset_y,
        new_image_width,
        new_image_height
    );
}

#[test]
fn test_crop_pass() {
    // Representing a image of 4x4 pixels
    let mut orig_image:[(Field, Field, Field); DEPTH] = [(0, 0, 0); DEPTH];
    orig_image[0] =  (1, 2, 3);
    orig_image[1] =  (1, 2, 3);
    orig_image[2] =  (1, 2, 3);
    orig_image[3] =  (1, 2, 3);

    orig_image[4] =  (1, 2, 3);
    orig_image[5] =  (3, 2, 1);
    orig_image[6] =  (3, 2, 1);
    orig_image[7] =  (1, 2, 3);

    orig_image[8] =  (1, 2, 3);
    orig_image[9] =  (3, 2, 1);
    orig_image[10] =  (3, 2, 1);
    orig_image[11] =  (1, 2, 3);

    orig_image[12] =  (1, 2, 3);
    orig_image[13] =  (1, 2, 3);
    orig_image[14] =  (1, 2, 3);
    orig_image[15] =  (1, 2, 3);


    // Representing a image of 2x2 pixels
    let mut new_image:[(Field, Field, Field); DEPTH] = [(0, 0, 0); DEPTH];
    new_image[0] =  (3, 2, 1);
    new_image[1] =  (3, 2, 1);
    new_image[2] =  (3, 2, 1);
    new_image[3] =  (3, 2, 1);

    let orig_image_width = 4;
    let orig_image_height = 4;
    let new_image_width = 2;
    let new_image_height = 2;

    // Starting coordinates of the crop image
    let crop_offset_x = 1;
    let crop_offset_y = 1;

    // should fail if the crop is not correct
    main(
        orig_image,
        new_image,
        orig_image_width,
        orig_image_height,
        crop_offset_x,
        crop_offset_y,
        new_image_width,
        new_image_height
    );
}

#[test]
fn test_crop_fail() {
    // Representing a image of 4x4 pixels
    let mut orig_image:[(Field, Field, Field); DEPTH] = [(0, 0, 0); DEPTH];
    orig_image[0] =  (1, 2, 3);
    orig_image[1] =  (1, 2, 3);
    orig_image[2] =  (1, 2, 3);
    orig_image[3] =  (1, 2, 3);

    orig_image[4] =  (1, 2, 3);
    orig_image[5] =  (3, 2, 1);
    orig_image[6] =  (3, 2, 1);
    orig_image[7] =  (1, 2, 3);

    orig_image[8] =  (1, 2, 3);
    orig_image[9] =  (3, 2, 1);
    orig_image[10] =  (3, 2, 1);
    orig_image[11] =  (1, 2, 3);
    
    orig_image[12] =  (1, 2, 3);
    orig_image[13] =  (1, 2, 3);
    orig_image[14] =  (1, 2, 3);
    orig_image[15] =  (1, 2, 3);


    // Representing a image of 2x2 pixels
    let mut new_image:[(Field, Field, Field); DEPTH] = [(0, 0, 0); DEPTH];
    new_image[0] =  (3, 2, 1);
    new_image[1] =  (3, 2, 1);
    new_image[2] =  (3, 2, 1);
    new_image[3] =  (3, 2, 1);

    let orig_image_width = 4;
    let orig_image_height = 4;
    let new_image_width = 2;
    let new_image_height = 2;

    // Starting coordinates of the crop image
    let crop_offset_x = 2;
    let crop_offset_y = 1;

    // should fail if the crop is not correct
    main(
        orig_image,
        new_image,
        orig_image_width,
        orig_image_height,
        crop_offset_x,
        crop_offset_y,
        new_image_width,
        new_image_height
    );
}
