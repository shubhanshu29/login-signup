import React from "react";
import { View } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import styles from "./style";

export const TweetsSkeleton = () => {
  return (
    <SkeletonPlaceholder>
      <View style={styles.bigScreen}>
        <View style={styles.container}>
          <View style={styles.tinyLogo} />
          <View style={{ marginLeft: 20 }}>
            <View style={{ width: 120, height: 20, borderRadius: 4 }} />
            <View
              style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
            />
          </View>
          <View style={styles.seperator} />
        </View>
        <View style={styles.popularity}>
          <View style= {styles.likeIcon}/>
          <View style= {styles.likeIcon}/>
          <View style= {styles.likeIcon}/>
          <View style= {styles.likeIcon}/>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};